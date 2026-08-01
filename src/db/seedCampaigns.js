/**
 * =============================================================================
 * Seed Campaigns Script
 * =============================================================================
 *
 * Populates sample campaigns into the MongoDB database for development & testing.
 * Can be executed via: `node src/db/seedCampaigns.js`
 */

import { ObjectId } from 'mongodb';
import { connectDB, disconnectDB } from './connection.js';
import { getCampaignsCollection, createCampaignIndexes } from '../models/campaign.model.js';
import logger from '../utils/logger.js';

const mockCampaigns = [
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e1'),
    title: 'Clean Water Initiative for Rural Communities',
    description: 'Providing sustainable solar-powered water filtration systems to remote villages.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    category: 'Environment',
    goalAmount: 25000,
    raisedAmount: 18450,
    deadline: new Date('2026-09-30T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d901'),
    creatorName: 'Sarah Jenkins',
    createdAt: new Date('2026-07-01T10:00:00.000Z'),
    updatedAt: new Date('2026-07-15T14:20:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e2'),
    title: 'NextGen Open Source AI Code Assistant',
    description: 'An intelligent local assistant designed for privacy-focused developers.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    goalAmount: 50000,
    raisedAmount: 42000,
    deadline: new Date('2026-08-15T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d902'),
    creatorName: 'Alex Rivera',
    createdAt: new Date('2026-07-10T12:30:00.000Z'),
    updatedAt: new Date('2026-07-20T09:15:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e3'),
    title: 'Community Urban Garden & Youth Center',
    description: 'Transforming vacant lots into lush green spaces and educational workshops for kids.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    category: 'Community',
    goalAmount: 15000,
    raisedAmount: 3200,
    deadline: new Date('2026-10-15T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d903'),
    creatorName: 'Marcus Vance',
    createdAt: new Date('2026-07-20T16:00:00.000Z'),
    updatedAt: new Date('2026-07-21T08:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e4'),
    title: 'Eco-Friendly Bamboo Wireless Keyboard',
    description: 'Sustainably handcrafted bamboo mechanical keyboard with hot-swappable switches.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    goalAmount: 30000,
    raisedAmount: 29500,
    deadline: new Date('2026-08-05T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d904'),
    creatorName: 'Elena Rostova',
    createdAt: new Date('2026-07-25T08:45:00.000Z'),
    updatedAt: new Date('2026-07-28T11:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e5'),
    title: 'Independent Documentary: Voices of the Ocean',
    description: 'A cinematic exploration of marine conservation and coastal communities fighting plastic pollution.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    category: 'Charity',
    goalAmount: 40000,
    raisedAmount: 12000,
    deadline: new Date('2026-11-01T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d905'),
    creatorName: 'David Zhang',
    createdAt: new Date('2026-07-28T14:00:00.000Z'),
    updatedAt: new Date('2026-07-29T10:30:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e6'),
    title: 'Emergency Response Mobile Medical Clinic',
    description: 'Deploying custom all-terrain medical vans for remote emergency relief.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    category: 'Medical',
    goalAmount: 75000,
    raisedAmount: 32000,
    deadline: new Date('2026-08-28T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d906'),
    creatorName: 'Dr. David Chen',
    createdAt: new Date('2026-07-15T09:00:00.000Z'),
    updatedAt: new Date('2026-07-20T10:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e7'),
    title: 'Scholarships for Underprivileged Youth',
    description: 'Funding full STEM college scholarships for talented high school graduates.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    category: 'Education',
    goalAmount: 15000,
    raisedAmount: 12100,
    deadline: new Date('2026-08-18T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d907'),
    creatorName: 'Maria Santos',
    createdAt: new Date('2026-07-12T11:00:00.000Z'),
    updatedAt: new Date('2026-07-22T14:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e8'),
    title: 'Pediatric Cancer Treatment Support Fund',
    description: 'Providing direct financial aid for specialized pediatric oncology therapies.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    category: 'Medical',
    goalAmount: 90000,
    raisedAmount: 67500,
    deadline: new Date('2026-08-25T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d908'),
    creatorName: 'Hope for Kids Org',
    createdAt: new Date('2026-07-14T08:00:00.000Z'),
    updatedAt: new Date('2026-07-25T16:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9e9'),
    title: 'Open-Source Coding Bootcamp for Veterans',
    description: 'Tuition-free software engineering curriculum for transitioning military personnel.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Education',
    goalAmount: 30000,
    raisedAmount: 21400,
    deadline: new Date('2026-08-30T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d909'),
    creatorName: 'VetCode Alliance',
    createdAt: new Date('2026-07-16T13:00:00.000Z'),
    updatedAt: new Date('2026-07-26T11:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9ea'),
    title: 'Autonomous Drone Reforestation Initiative',
    description: 'Planting 100,000 native tree seed pods using automated precision drones.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    category: 'Environment',
    goalAmount: 60000,
    raisedAmount: 48900,
    deadline: new Date('2026-08-21T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d90a'),
    creatorName: 'Green Canopy Collective',
    createdAt: new Date('2026-07-17T15:00:00.000Z'),
    updatedAt: new Date('2026-07-27T09:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9eb'),
    title: 'Smart Agricultural Sensors for Smallholder Farmers',
    description: 'Low-cost soil moisture and nutrient sensors connected via mesh networks.',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    goalAmount: 40000,
    raisedAmount: 15200,
    deadline: new Date('2026-09-10T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d90b'),
    creatorName: 'AgriTech Labs',
    createdAt: new Date('2026-07-18T10:00:00.000Z'),
    updatedAt: new Date('2026-07-28T12:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9ec'),
    title: 'Shelter Animal Rehabilitation & Adoption Unit',
    description: 'Expanding medical suites and play yards for rescued animals awaiting adoption.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    category: 'Charity',
    goalAmount: 20000,
    raisedAmount: 18900,
    deadline: new Date('2026-08-14T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d90c'),
    creatorName: 'Paws & Care Rescue',
    createdAt: new Date('2026-07-19T14:00:00.000Z'),
    updatedAt: new Date('2026-07-29T10:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9ed'),
    title: 'Urban Youth Center & Maker Workshop',
    description: 'Safe after-school space equipped with 3D printers, woodworking, and robotics.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    category: 'Community',
    goalAmount: 35000,
    raisedAmount: 28000,
    deadline: new Date('2026-08-24T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d90d'),
    creatorName: 'City Makers Hub',
    createdAt: new Date('2026-07-21T11:00:00.000Z'),
    updatedAt: new Date('2026-07-30T15:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9ee'),
    title: 'Cardiac Monitoring Devices for Rural Clinics',
    description: 'Equipping rural health outposts with portable ECG scanners and tele-consultation.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    category: 'Medical',
    goalAmount: 55000,
    raisedAmount: 41200,
    deadline: new Date('2026-09-01T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d90e'),
    creatorName: 'Heart Health Global',
    createdAt: new Date('2026-07-22T09:00:00.000Z'),
    updatedAt: new Date('2026-07-30T17:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9ef'),
    title: 'Braille & Audio Library Digitalization Project',
    description: 'Digitizing 5,000 classic textbooks into tactile Braille displays and audiobooks.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    category: 'Education',
    goalAmount: 18000,
    raisedAmount: 16500,
    deadline: new Date('2026-08-19T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d90f'),
    creatorName: 'Access Read Foundation',
    createdAt: new Date('2026-07-23T12:00:00.000Z'),
    updatedAt: new Date('2026-07-31T09:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9f0'),
    title: 'Ocean Plastic Cleanup Barrier Fleet',
    description: 'Constructing floating boom systems to capture river plastic before entering oceans.',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
    category: 'Environment',
    goalAmount: 150000,
    raisedAmount: 112000,
    deadline: new Date('2026-09-15T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d910'),
    creatorName: 'Blue Seas Coalition',
    createdAt: new Date('2026-07-24T16:00:00.000Z'),
    updatedAt: new Date('2026-07-31T11:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9f1'),
    title: 'Wearable Glucose Monitor for Diabetes Patients',
    description: 'Non-invasive continuous optical glucose monitoring sensor patch.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    goalAmount: 85000,
    raisedAmount: 62000,
    deadline: new Date('2026-08-26T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d911'),
    creatorName: 'BioSensTech',
    createdAt: new Date('2026-07-25T10:00:00.000Z'),
    updatedAt: new Date('2026-07-31T14:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9f2'),
    title: 'Disaster Relief Food & Water Distribution Kits',
    description: 'Pre-positioning emergency rations and water purification tablets in storm zones.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
    category: 'Charity',
    goalAmount: 50000,
    raisedAmount: 47800,
    deadline: new Date('2026-08-13T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d912'),
    creatorName: 'Global Aid Response',
    createdAt: new Date('2026-07-26T08:00:00.000Z'),
    updatedAt: new Date('2026-07-31T15:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9f3'),
    title: 'Neighborhood Solar Microgrid Cooperative',
    description: 'Shared neighborhood battery storage system powered by distributed residential solar.',
    image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=800&q=80',
    category: 'Community',
    goalAmount: 70000,
    raisedAmount: 39000,
    deadline: new Date('2026-08-29T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d913'),
    creatorName: 'Community Energy Co-op',
    createdAt: new Date('2026-07-27T11:00:00.000Z'),
    updatedAt: new Date('2026-07-31T16:00:00.000Z'),
  },
  {
    _id: new ObjectId('66a9b1c2d3e4f5a6b7c8d9f4'),
    title: 'Mental Health Tele-Counseling Mobile Platform',
    description: 'Free, confidential video counseling app with licensed therapists for youth.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    category: 'Medical',
    goalAmount: 40000,
    raisedAmount: 31000,
    deadline: new Date('2026-08-23T23:59:59.000Z'),
    creatorId: new ObjectId('66a9b1c2d3e4f5a6b7c8d914'),
    creatorName: 'MindCare Alliance',
    createdAt: new Date('2026-07-28T09:00:00.000Z'),
    updatedAt: new Date('2026-07-31T17:00:00.000Z'),
  },
];

export async function seedCampaigns() {
  try {
    await connectDB();
    await createCampaignIndexes();

    const collection = getCampaignsCollection();

    for (const campaign of mockCampaigns) {
      await collection.updateOne(
        { _id: campaign._id },
        { $set: campaign },
        { upsert: true },
      );
    }

    logger.info(`Successfully seeded ${mockCampaigns.length} campaigns into MongoDB.`);
  } catch (error) {
    logger.error('Error seeding campaigns', { error: error.message });
  } finally {
    await disconnectDB();
  }
}

/**
 * Checks the campaign collection count and seeds at least 20 sample campaigns if count < 20.
 */
export async function ensureMinimumCampaigns() {
  try {
    const collection = getCampaignsCollection();
    const count = await collection.countDocuments();
    if (count < 20) {
      logger.info(`Found ${count} campaigns (fewer than 20). Inserting sample campaign data...`);
      for (const campaign of mockCampaigns) {
        await collection.updateOne(
          { _id: campaign._id },
          { $set: campaign },
          { upsert: true },
        );
      }
      logger.info(`Successfully ensured at least 20 campaigns in MongoDB.`);
    }
  } catch (error) {
    logger.error('Error ensuring minimum campaigns in DB', { error: error.message });
  }
}

if (process.argv[1]?.includes('seedCampaigns.js')) {
  seedCampaigns();
}

