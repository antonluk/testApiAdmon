import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, './spec/root.yml'));

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: [],
};

export default swaggerOptions;
