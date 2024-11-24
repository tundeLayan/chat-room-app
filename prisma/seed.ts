/* eslint-disable @typescript-eslint/no-var-requires */

const client = require('@prisma/client');

const { PrismaClient } = client;

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.reaction.deleteMany();
    await prisma.message.deleteMany();
    await prisma.chatRoom.deleteMany();
    await prisma.user.deleteMany();

    // Create initial chat rooms
    const rooms = [
        {
            name: 'General',
            description: 'General discussion about anything',
        },
        {
            name: 'Tech Talk',
            description: 'Discussion about technology and programming',
        },
        {
            name: 'Random',
            description: 'Random conversations and fun topics',
        },
        {
            name: 'Support',
            description: 'Get help and support from the community',
        },
        {
            name: 'Introductions',
            description: 'Introduce yourself to the community',
        },
    ];

    for (const room of rooms) {
        await prisma.chatRoom.create({
            data: room,
        });
    }

    console.log('Seed completed successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
