<?php

use App\Models\User;
use App\Notifications\InstructorApprovalNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

it('delivers admin application alerts through database and mail', function () {
    $admin = new User(['name' => 'Administrator', 'role' => 'admin']);
    $notification = new InstructorApprovalNotification(['status' => 'pending']);
    $mail = $notification->toMail($admin);

    expect($notification->via($admin))->toBe(['database', 'mail'])
        ->and($mail->subject)->toBe('Instructor application awaiting review')
        ->and($mail->actionUrl)->toBe(route('instructors.applications'))
        ->and($notification->toArray($admin)['url'])->toBe(route('instructors.applications'));
});

it('accepts an applicant decision without optional feedback', function (string $status) {
    $user = new User(['name' => 'Applicant', 'role' => 'student']);
    $notification = new InstructorApprovalNotification(['status' => $status]);

    expect($notification->toMail($user)->viewData['feedback'])->toBe('')
        ->and($notification->toArray($user)['body'])->toBe('');
})->with(['approved', 'rejected', 'pending']);

it('keeps database alerts immediate and retries mail independently after commit', function () {
    config(['queue.default' => 'database']);
    $notification = new InstructorApprovalNotification(['status' => 'pending']);

    expect($notification)->toBeInstanceOf(ShouldQueue::class)
        ->and($notification->viaConnections())->toBe(['database' => 'sync', 'mail' => 'database'])
        ->and($notification->afterCommit)->toBeTrue()
        ->and($notification->tries)->toBe(3)
        ->and($notification->backoff())->toBe([60, 300, 900]);
});
