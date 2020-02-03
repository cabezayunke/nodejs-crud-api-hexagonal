const BlogPostService = require('../../src/blogposts/business/BlogPostService')
const BlogPostValidator = require('../../src/blogposts/business/BlogPostValidator')
const BlogPostValidatorSpy = require('../helpers/BlogPostValidatorSpy')
const BlogPostRepositoryStub = require('../helpers/BlogPostRepositoryStub')


describe('BlogPostService', () => {
  let service, realValidatorService
  beforeAll(async () => {
    service = BlogPostService({
      repository: BlogPostRepositoryStub,
      validator: BlogPostValidatorSpy,
    })
    realValidatorService = BlogPostService({
      repository: BlogPostRepositoryStub,
      validator: BlogPostValidator,
    })
  })
  afterEach(async () => {
    BlogPostValidatorSpy.reset()
    expect.hasAssertions()
  })

  test('should throw not found error when trying to fetch blog post that does not exist', async () => {
    await expect(service.getBlogPost("missing")).rejects.toThrow('Blog post not found')
  })
  test('should return draft blog post if exists', async () => {
    const blogPost = { title: 'fake title', body: 'fake body', status: 'draft' }
    const fakeService = BlogPostService({
      repository: {
        find: async (id) => blogPost,
      },
      validator: BlogPostValidatorSpy,
    })
    await expect(fakeService.getBlogPost('whateverId')).resolves.toBe(blogPost)
    expect(BlogPostValidatorSpy.hasBeenCalled('validateBlogPostId')).toEqual(true)
    expect(BlogPostValidatorSpy.getFnInvocationCount('validateBlogPostId')).toEqual(1)
  })
  test('should create a blog post with valid adapters', async () => {
    const blogPost = { title: 'fake title', body: 'fake body', status: 'draft' }
    const fakeService = BlogPostService({
      repository: {
        save: async (id) => blogPost,
      },
      validator: BlogPostValidatorSpy,
    })
    await expect(fakeService.createBlogPost('whateverId')).resolves.toBe(blogPost)
    expect(BlogPostValidatorSpy.hasBeenCalled('validateBlogPostFields')).toEqual(true)
    expect(BlogPostValidatorSpy.getFnInvocationCount('validateBlogPostFields')).toEqual(1)
  })
  test('should not create blog post without title', async () => {
    await expect(realValidatorService.createBlogPost({
      body: 'fake body',
    })).rejects.toThrow('ValidationError')
  })
  test('should not create blog post without body', async () => {
    await expect(realValidatorService.createBlogPost({
      title: 'fake title yeah',
    })).rejects.toThrow('ValidationError')
  })
  test('should update a blog post with a valid adapters', async () => {
    const data = {
      title: 'this is my updated title',
      body: 'this is my updated body'
    }
    await expect(realValidatorService.updateBlogPost({
      ...data,
      id: 'myId',
    })).resolves.toEqual({
      ...data,
      id: 'myId',
    })
  })

  test('should not update blog post with empty title', async () => {
    await expect(realValidatorService.updateBlogPost({
      id: 'myId',
      title: '',
      body: 'fake body',
    })).rejects.toThrow('ValidationError')
  })
  test('should not update blog post with invalid title', async () => {
    await expect(realValidatorService.updateBlogPost({
      id: 'myId',
      title: 1000,
      body: 'fake body',
    })).rejects.toThrow('ValidationError')
  })
  test('should not update blog post with title with less than 10 chars', async () => {
    await expect(realValidatorService.updateBlogPost({
      id: 'myId',
      title: 'tooshort',
      body: 'fake body',
    })).rejects.toThrow('ValidationError')
  })
  test('should delete blog post if exists', async () => {
    const fakeService = BlogPostService({
      repository: {
        remove: async (id) => true,
      },
      validator: BlogPostValidatorSpy,
    })
    await expect(fakeService.deleteBlogPost('whateverId')).resolves.toBe(true)
    expect(BlogPostValidatorSpy.hasBeenCalled('validateBlogPostId')).toEqual(true)
    expect(BlogPostValidatorSpy.getFnInvocationCount('validateBlogPostId')).toEqual(1)
  })
  test('should throw not found error when trying to delete a blog post that does not exist', async () => {
    const fakeService = BlogPostService({
      repository: {
        remove: async (id) => false,
      },
      validator: BlogPostValidatorSpy,
    })
    await expect(fakeService.deleteBlogPost('whateverId')).rejects.toThrow('Blog post not found')
    expect(BlogPostValidatorSpy.hasBeenCalled('validateBlogPostId')).toEqual(true)
    expect(BlogPostValidatorSpy.getFnInvocationCount('validateBlogPostId')).toEqual(1)
  })
})
