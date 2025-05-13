import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { BlogPost } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BlogPostPage() {
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${slug}`],
    enabled: Boolean(slug),
  });

  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: [`/api/blog-posts/related/${slug}`],
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-96 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl mb-8"></div>
          <div className="w-2/3 h-10 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded mb-4"></div>
          <div className="w-1/3 h-6 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-6 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          We couldn't find the blog post you're looking for.
        </p>
        <Link href="/blog">
          <Button className="bg-primary hover:bg-primary-dark">
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Rahul Tours Sri Lanka Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://dearsrilanka.com/blog/${post.slug}`} />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-white">
              <div className="flex gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge key={index} className="bg-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.authorImageUrl} 
                    alt={post.author} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="far fa-calendar"></i>
                  <span>{post.publishDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link key={index} href={`/blog?tag=${tag}`}>
                  <Badge variant="outline" className="hover:bg-primary hover:text-white transition cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Author Bio */}
            <div className="mt-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 flex items-start gap-6">
              <img 
                src={post.authorImageUrl} 
                alt={post.author} 
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Travel writer and Sri Lanka expert with over 10 years of experience exploring 
                  the island nation. Passionate about sharing authentic local experiences and 
                  hidden gems with travelers.
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-8">
              <h4 className="font-bold mb-4">Share this post:</h4>
              <div className="flex gap-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://dearsrilanka.com/blog/${post.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#3b5998] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Share on Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=https://dearsrilanka.com/blog/${post.slug}&text=${post.title}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1DA1F2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Share on Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://dearsrilanka.com/blog/${post.slug}&title=${post.title}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#0077B5] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Share on LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a 
                  href={`mailto:?subject=${post.title}&body=Check out this article: https://dearsrilanka.com/blog/${post.slug}`} 
                  className="bg-neutral-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Share via Email"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Related Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display">Related Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedPosts && relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex items-start gap-3">
                        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={relatedPost.imageUrl} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/blog/${relatedPost.slug}`} className="font-medium hover:text-primary transition">
                            {relatedPost.title}
                          </Link>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{relatedPost.publishDate}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No related articles found.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Travel Tips", "Culture", "Wildlife", "Beaches", "Food", "Adventure", "History", "Photography"].map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant="outline" className="hover:bg-primary hover:text-white transition cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscribe */}
            <Card>
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle className="text-xl font-display">Subscribe to Our Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Get the latest travel tips and updates delivered straight to your inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"
                    required
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* More Articles */}
        <Separator className="my-16" />
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold">More Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts && relatedPosts.length > 0 ? (
            relatedPosts.slice(0, 3).map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden">
                <div className="h-48">
                  <img 
                    src={relatedPost.imageUrl} 
                    alt={relatedPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <h3 className="text-xl font-display font-bold mb-2 hover:text-primary transition">
                      {relatedPost.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    {relatedPost.publishDate}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-300 line-clamp-3 mb-4">
                    {relatedPost.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p>No related articles available.</p>
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition">
              View All Articles
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
