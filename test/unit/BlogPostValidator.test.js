const BlogPostValidator = require('../../src/blogposts/business/BlogPostValidator')

describe('BlogPostValidator', () => {

  afterEach(async () => expect.hasAssertions())

  test('should throw error if id is invalid type', () => {
    expect(() => BlogPostValidator.validateBlogPostId(1)).toThrow('ValidationError')
  })
  test('should throw error if id is missing or empty', () => {
    expect(() => BlogPostValidator.validateBlogPostId('')).toThrow('ValidationError')
  })
  test('should not throw error if id is valid', () => {
    expect(BlogPostValidator.validateBlogPostId('whatever')).toBe(true)
  })

  test('should throw error if title missing or empty', async () => {
    expect(() => BlogPostValidator.validateBlogPostFields({
      body: 'valid body'
    })).toThrow('ValidationError')
  })
  test('should throw error if body missing or empty', async () => {
    expect(() => BlogPostValidator.validateBlogPostFields({
      title: 'valid title'
    })).toThrow('ValidationError')
  })
  test('should throw error if title is invalid type', async () => {
    expect(() => BlogPostValidator.validateBlogPostFields({
      title: {},
      body: 'valid body'
    })).toThrow('ValidationError')
  })
  test('should throw error if body is invalid type', async () => {
    expect(() => BlogPostValidator.validateBlogPostFields({
      title: 'valid title',
      body: [],
    })).toThrow('ValidationError')
  })
  test('should not throw error with valid adapters', async () => {
    expect(BlogPostValidator.validateBlogPostFields({
      title: 'valid title',
      body: 'valid body'
    })).toBe(true)
  })
  test('should throw error with title with less than 10 chars', async () => {
    expect(() => BlogPostValidator.validateBlogPostFields({
      title: 'tooshort',
      body: 'valid body'
    })).toThrow('ValidationError')
  })

})
