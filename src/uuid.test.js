import { generateUUID } from './uuid';
test('can generate UUID', function () {
    var realRandom = global.Math.random;
    var randomStub = jest.fn(function () { return 0.4; });
    global.Math.random = randomStub;
    var correct = '66666666-6666-4666-a666-666666666666';
    var attempt = generateUUID();
    expect(randomStub).toHaveBeenCalled();
    expect(attempt).toBe(correct);
    global.Math.random = realRandom;
});
