import { PrismaClient, Prisma, Role } from '@prisma/client'

const prisma = new PrismaClient()

const userPermission: Prisma.UserPermissionCreateInput = {
  role: Role.USER,
};

const adminPermission: Prisma.UserPermissionCreateInput = {
  role: Role.ADMIN,
};

const permissions: Prisma.UserPermissionCreateInput[] = [
  userPermission,
  adminPermission,
]

const users: Prisma.UserCreateInput[] = [
  {
    id: 'ckvtcy4e30014jqus0gk4koe4',
    name: 'John Doe',
    email: 'john@example.com',
    emailVerified: new Date(),
    account: {
      create: {
        password: '123',
        permissions: {
          connect: [
            userPermission,
          ],
        },
      },
    },
    consumedFoods: {
      create: [
        {
          id: 'ckvtg0k6d0016eous7ji1l2px',
          name: 'banana',
          calories: 88,
          consumedAt: new Date(),
        },
        {
          id: 'ckvtu4jmg0016o3uso7qw2j29',
          name: 'eggs',
          calories: 135,
          consumedAt: new Date()
        },
      ],
    },
  },
  {
    id: 'ckvtcy4e80029jqus9m2xy61t',
    name: 'Jane Doe',
    email: 'admin@example.com',
    emailVerified: new Date(),
    account: {
      create: {
        password: '123',
        permissions: {
          connect: [
            userPermission,
            adminPermission,
          ],
        },
      },
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const p of permissions) {
    const permission = await prisma.userPermission.create({
      data: p,
    });
    console.log('created user permission:');
    console.dir(permission);
  }
  for (const u of users) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log('created user:');
    console.dir(user);
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })