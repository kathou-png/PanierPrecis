run nodemon app.ts to launch the server

For a migration :

- Modify the schema
  if the migration file can be created and executed directly :
- npx prisma migrate dev --name init

else :

- npx prisma migrate dev --create-only
- npx prisma migrate dev
