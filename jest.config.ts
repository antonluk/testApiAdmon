process.env.NODE_ENV = 'test';

module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    transformIgnorePatterns: ['/node_modules/'],
};