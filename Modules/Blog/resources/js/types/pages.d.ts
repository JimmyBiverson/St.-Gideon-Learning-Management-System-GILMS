interface BlogsIndexProps extends SharedData {
   blogs: Pagination<Blog>;
   category?: BlogCategory;
   categories: BlogCategory[];
}

interface BlogShowProps extends SharedData {
   blog: Blog;
   likesCount: number;
   dislikesCount: number;
   commentsCount: number;
   userReaction?: 'like' | 'dislike' | null;
}

interface BlogCategoriesPageProps extends SharedData {
   categories: BlogCategory[];
}

interface BlogCreateEditProps extends SharedData {
   blog?: Blog;
   categories: BlogCategory[];
   statuses: Record<string, string>;
}
