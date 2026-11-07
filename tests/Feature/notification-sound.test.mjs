import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createNotificationTracker } from '../../resources/js/lib/notification-sound.ts';

const item = (id, seconds) => ({ id, created_at: `2026-11-06T10:00:${seconds}Z` });

test('initial unread items and repeated polls do not trigger sound', () => {
   const track = createNotificationTracker();
   assert.deepEqual(track([item('a', '10')]), []);
   assert.deepEqual(track([item('a', '10')]), []);
});

test('a new notification chimes once, including timestamps within the same second', () => {
   const track = createNotificationTracker();
   track([item('a', '10')]);
   assert.deepEqual(track([item('b', '10'), item('a', '10')]).map(item => item.id), ['b']);
   assert.deepEqual(track([item('b', '10')]), []);
});

test('reading notifications does not chime for older items revealed by pagination', () => {
   const track = createNotificationTracker();
   track([item('a', '20')]);
   assert.deepEqual(track([item('older', '10')]), []);
});

test('new arrivals after an empty initial feed are detected', () => {
   const track = createNotificationTracker();
   track([]);
   assert.equal(track([item('a', '10')]).length, 1);
});
