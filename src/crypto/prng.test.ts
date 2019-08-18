import randomBytes from './prng'

it('should generate two different payloads', async function () {
  const first = randomBytes(16)
  const second = randomBytes(16)

  expect(first).not.toBe(second)
})
