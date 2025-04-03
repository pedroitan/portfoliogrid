# Itan - Creative Director Portfolio

A modern, minimal, and artsy video portfolio for Creative Director Itan, showcasing work in Film Direction, Music Production, and Audiovisual Engineering.

## Features

- Modern, minimal design with a focus on video content
- Responsive grid layout that adapts to different screen sizes
- Tag-based filtering to sort videos by category
- Dynamic hover animations for improved user experience
- Embedded videos from YouTube and Vimeo
- Bio and contact sections

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/components/` - React components used throughout the site
- `src/data/videos.js` - Database of all video content with tags
- `src/app/` - Main application files
- `public/images/` - Static assets including profile image

## Customizing Content

### Adding or Editing Videos

To add or edit videos, modify the `src/data/videos.js` file. Each video should follow this format:

```javascript
{
  id: [unique_id],
  title: "Video Title",
  url: "https://www.youtube.com/watch?v=XXXXXX", // or Vimeo URL
  tags: ["tag1", "tag2"],
  platform: "youtube" // or "vimeo"
}
```

### Updating Personal Information

To update the bio information, edit the `Bio.jsx` component in the `src/components/` directory.

### Changing Contact Information

Update the contact details in the `Contact.jsx` component.

## Technologies Used

- **Next.js** - React framework for production
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Player** - For embedding video content

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
