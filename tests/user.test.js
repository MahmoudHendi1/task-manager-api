const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId,
    userOne,
    setupDatabase}=require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user',async()=>{
    const response = await request(app).post('/users').send({
        name:'Mahmoud Salah',
        email:'mahmoudsalah.pr@gmail.com',
        password:'sesese123'
    }).expect(201)

    //Assert that database was changed correctly
    const user = await User.findById(response.body.user._id)

    expect(user).not.toBeNull()

    //Assertion about the response
    expect(response.body).toMatchObject({
        user:{
            name:'Mahmoud Salah',
            email:'mahmoudsalah.pr@gmail.com'
        },
        token:user.tokens[0].token
    })
    expect(response.body.user.name).toBe('Mahmoud Salah')

    expect(user.password).not.toBe('123456789')
})

test('Should Login existing user',async()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    
    const user =await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async()=>{
    await request(app).post('/users/login').send({
        email:'elbrance66@gmail.com',
        password:'sesese123'
    }).expect(400)
})

test('Should get profile for user', async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should upload an image',async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user =await User.findById(userOneId)

    expect(user.avatar).toEqual(expect.any(Buffer))


})


test('Should not get profile for unauthenticated user',async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user',async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)  

    const user =await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user',async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)  
})


test('Should update valid fields',async()=>{
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'Salah'
    }).expect(200)
    
    const user=await User.findById(userOneId)
    expect(user.name).toEqual('Salah')
    
})

test('Should not update invalid fields',async()=>{
    const response = await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'Phil'
    }).expect(400)


})