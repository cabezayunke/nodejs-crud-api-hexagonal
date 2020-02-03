const HttpStatus = require('http-status-codes')
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest')
const App = require('../../src/common/setup/App')
const createBlogPostRouter = require('../../src/blogposts/drivers/actors/BlogPostRouter')
const { db, controller } = require('../../src/blogposts/drivers/actors/CompositionRoot')
const { blogPostsUp, blogPostsDown } = require('../fixtures/blogposts')

describe('BlogPostRouter', () => {
  let app, request, testData
  beforeAll(async () => {
    app = App(createBlogPostRouter({ controller }))
    request = supertest(app.listen())
    testData = await blogPostsUp()
  })
  afterAll(async () => {
    await blogPostsDown()
    await db.close();
  })
  afterEach(async () => expect.hasAssertions())

  test('should throw not found error when trying to fetch blog post that does not exist', async () => {
    const res = await request.get('/api/v1/blogposts/1')
    expect(res.status).toEqual(HttpStatus.NOT_FOUND)
  })
  test('should return draft blog post if exists', async () => {
    const res = await request.get(`/api/v1/blogposts/${testData.blogPost.id}`)
    expect(res.body.title).toEqual(testData.blogPost.title)
    expect(res.body.body).toEqual(testData.blogPost.body)
  })
  test('should create a blog post with valid adapters', async () => {
    const title = 'this is my custom title'
    const body = 'this is my custom body'
    const res = await request.post(`/api/v1/blogposts`).send({
      title,
      body,
    })
    expect(res.body.title).toEqual(title)
    expect(res.body.body).toEqual(body)
  })
  test('should not create blog post without title', async () => {
    const res = await request.post(`/api/v1/blogposts`).send({
      body: 'missing title',
    })
    expect(res.status).toEqual(HttpStatus.BAD_REQUEST)
  })
  test('should not create blog post without body', async () => {
    const res = await request.post(`/api/v1/blogposts`).send({
      title: 'missing body',
    })
    expect(res.status).toEqual(HttpStatus.BAD_REQUEST)
  })
  test('should update a blog post with a valid title', async () => {
    const title = 'this is my UPDATED title'
    const body = testData.blogPost.body
    const updated = await request.put(`/api/v1/blogposts/${testData.blogPost.id}`).send({
      title,
      body,
    })
    expect(updated.body.id).toEqual(testData.blogPost.id)
    expect(updated.body.title).toEqual(title)
    expect(updated.body.body).toEqual(body)
  })
  test('should update a blog post with a valid body', async () => {
    const title = testData.blogPost.title
    const body = 'this is my UPDATED body'
    const updated = await request.put(`/api/v1/blogposts/${testData.blogPost.id}`).send({
      title,
      body,
    })
    expect(updated.body.id).toEqual(testData.blogPost.id)
    expect(updated.body.title).toEqual(title)
    expect(updated.body.body).toEqual(body)
  })
  test('should not update blog post with empty title', async () => {
    const body = testData.blogPost.body
    const updated = await request.put(`/api/v1/blogposts/${testData.blogPost.id}`).send({
      title: '',
      body,
    })
    expect(updated.status).toEqual(HttpStatus.BAD_REQUEST)
  })
  test('should not update blog post with invalid title', async () => {
    const body = testData.blogPost.body
    const updated = await request.put(`/api/v1/blogposts/${testData.blogPost.id}`).send({
      title: 3256, // this is invalid
      body,
    })
    expect(updated.status).toEqual(HttpStatus.BAD_REQUEST)
  })
  test('should not update blog post with title with less than 10 chars', async () => {
    const body = testData.blogPost.body
    const updated = await request.put(`/api/v1/blogposts/${testData.blogPost.id}`).send({
      title: 'invalid',
      body,
    })
    expect(updated.status).toEqual(HttpStatus.BAD_REQUEST)
  })
  test('should delete blog post if exists', async () => {
    const deleted = await request.delete(`/api/v1/blogposts/${testData.blogPost.id}`)
    expect(deleted.status).toEqual(HttpStatus.NO_CONTENT)
  })
  test('should throw not found error when trying to delete a blog post that does not exist', async () => {
    const deleted = await request.delete(`/api/v1/blogposts/invalid`)
    expect(deleted.status).toEqual(HttpStatus.NOT_FOUND)
  })
})
