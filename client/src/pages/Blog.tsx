import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { BlogPost } from "@/lib/types";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  // Filter blog posts based on search term and selected tag
  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Get unique tags from all posts
  const allTags = blogPosts 
    ? [...new Set(blogPosts.flatMap(post => post.tags))]
    : [];

  return (
    <>
      <Helmet>
        <title>Travel Blog - Sri Lanka Travel Tips & Guides | Rahul Tours Sri Lanka</title>
        <meta 
          name="description" 
          content="Discover travel tips, destination guides, and insider advice for planning your perfect Sri Lankan vacation in our travel blog."
        />
        <link rel="canonical" href="https://rahultoursrilanka.com/blog" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-primary-dark text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Travel Blog
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Discover travel tips, destination guides, and insider advice for your Sri Lankan adventure.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display">Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={!selectedTag ? "default" : "outline"} 
                    className="cursor-pointer"
                    onClick={() => setSelectedTag("")}
                  >
                    All
                  </Badge>
                  
                  {allTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant={selectedTag === tag ? "default" : "outline"} 
                      className="cursor-pointer"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!isLoading && blogPosts && (
                    blogPosts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex items-start gap-3">
                        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/blog/${post.slug}`} className="font-medium hover:text-primary transition">
                            {post.title}
                          </Link>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{post.publishDate}</p>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {isLoading && (
                    [...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-full"></div>
                          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <div className="h-60 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded-t-lg"></div>
                    <CardContent className="pt-6 space-y-4">
                      <div className="h-8 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-3/4"></div>
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-1/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">
                  Error loading blog posts. Please try again later.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-primary hover:bg-primary-dark"
                >
                  Refresh Page
                </Button>
              </div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="h-60 relative">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} className="bg-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-2xl font-display font-bold mb-2 hover:text-primary transition">
                          {post.title}
                        </h2>
                      </Link>
                      
                      <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        <div className="flex items-center gap-2">
                          <img 
                            src={post.authorImageUrl} 
                            alt={post.author} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="far fa-calendar"></i>
                          <span>{post.publishDate}</span>
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                        {post.excerpt}
                      </p>
                      
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition">
                          Read More
                          <i className="fas fa-arrow-right ml-2"></i>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <h2 className="text-2xl font-display font-bold mb-4">
                  No Posts Found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  We couldn't find any posts matching your search criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag("");
                  }}
                  className="bg-primary hover:bg-primary-dark"
                >
                  View All Posts
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
