``` 
npm i
```

```
Создайте базу и пропишите данные для подключения в .env
```

```
npm run build
```
Накатим миграции
```
npx typeorm migration:run -d ./dist/data-source.js
```

Если необходимо можно запустить сидер 
```
npm run seed
```

Запуск (node)
```
npm run start
```

Запуск dev (ts-node)
```
npm run dev
```


Тесты
```
npm run test
```

