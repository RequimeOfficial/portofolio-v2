export type BlogCategory = 'Web Dev' | 'Game Dev' | 'AI';

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; lang: string; code: string };

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  likes: number;
  featured: boolean;
  content: ContentBlock[];
}

export const blogCategories: Array<'All' | BlogCategory> = ['All', 'Web Dev', 'Game Dev', 'AI'];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'scalable-react-applications',
    title: 'Building Scalable React Applications: Best Practices for 2024',
    excerpt:
      'Learn the latest techniques for creating maintainable and scalable React applications with modern patterns and performance optimizations.',
    category: 'Web Dev',
    date: '2024-01-15',
    readTime: '8 min read',
    image: '/images/react-scalable-apps.jpg',
    tags: ['React', 'Performance', 'Best Practices'],
    likes: 42,
    featured: true,
    content: [
      {
        type: 'p',
        text: 'A React app rarely becomes hard to maintain because of a single bad decision. It happens slowly: a component grows a few more props, state gets lifted "just once more", and suddenly every change touches five files. Here are the practices I rely on to keep projects healthy as they grow.',
      },
      { type: 'h', text: '1. Organize by feature, not by file type' },
      {
        type: 'p',
        text: 'Instead of giant components/, hooks/ and utils/ folders, group code by feature. Everything related to checkout lives in features/checkout. When a feature is removed, you delete one folder instead of hunting through the whole tree.',
      },
      { type: 'h', text: '2. Keep state as close as possible to where it is used' },
      {
        type: 'p',
        text: 'Global state is convenient but expensive: every consumer re-renders when it changes. Start with local state, lift it only when two siblings truly need it, and reach for context or a store only for app-wide concerns like auth, theme or cart.',
      },
      { type: 'h', text: '3. Separate server state from UI state' },
      {
        type: 'p',
        text: 'Data that comes from an API has different needs — caching, refetching, invalidation — than a modal being open. Libraries like TanStack Query handle server state so your components only deal with presentation.',
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: () => fetch('/api/projects').then((r) => r.json()),
  staleTime: 60_000,
});`,
      },
      { type: 'h', text: '4. Measure before you optimize' },
      {
        type: 'ul',
        items: [
          'Use the React DevTools Profiler to find components that re-render too often.',
          'Wrap expensive child trees with React.memo only after you have measured a problem.',
          'Code-split routes and heavy widgets with React.lazy and Suspense.',
          'Virtualize long lists instead of rendering thousands of rows.',
        ],
      },
      { type: 'h', text: '5. Type your boundaries' },
      {
        type: 'p',
        text: 'TypeScript pays for itself most at the edges of your app: API responses, component props and shared utilities. Strong types there make refactors safe and turn many runtime bugs into compile-time errors.',
      },
      {
        type: 'p',
        text: 'Scalability is less about clever tricks and more about consistency. Pick conventions early, write them down, and let your tooling (ESLint, Prettier, TypeScript) enforce them.',
      },
    ],
  },
  {
    id: 2,
    slug: 'unity-concept-to-launch',
    title: 'Game Development with Unity: From Concept to Launch',
    excerpt:
      'A comprehensive guide to developing and publishing your first game using Unity engine, covering everything from design to monetization.',
    category: 'Game Dev',
    date: '2024-01-10',
    readTime: '12 min read',
    image: '/images/unity-game-dev.jpg',
    tags: ['Unity', 'Game Design', 'C#'],
    likes: 28,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Finishing a game is a skill on its own. Most first projects die not because the idea was bad, but because the scope was too big. This is the workflow I use to take a Unity game from a one-line concept to a published build.',
      },
      { type: 'h', text: 'Start with the core loop' },
      {
        type: 'p',
        text: 'Write down what the player does every 10 seconds. Jump and collect? Match and clear? Build a grey-box prototype of only that loop — no art, no menus — and play it until it is fun. If it is not fun with cubes, it will not be fun with beautiful art either.',
      },
      { type: 'h', text: 'Structure your project early' },
      {
        type: 'ul',
        items: [
          'Use ScriptableObjects for data such as enemy stats, levels and items.',
          'Keep MonoBehaviours small; one responsibility per component.',
          'Use prefabs and prefab variants instead of duplicating objects.',
          'Put the project under version control (Git + Git LFS for large assets) from day one.',
        ],
      },
      {
        type: 'code',
        lang: 'csharp',
        code: `[CreateAssetMenu(menuName = "Game/Enemy Data")]
public class EnemyData : ScriptableObject {
    public string enemyName;
    public int maxHealth = 100;
    public float moveSpeed = 3f;
}`,
      },
      { type: 'h', text: 'Polish is what players feel' },
      {
        type: 'p',
        text: 'Screen shake, particles, sound effects and small animations ("juice") make simple mechanics feel great. Reserve a dedicated phase for polish and playtest with people who have never seen the game.',
      },
      { type: 'h', text: 'Shipping and monetization' },
      {
        type: 'p',
        text: 'Pick one platform first. For mobile, test on low-end devices and keep build size small. Decide on monetization (premium, ads, or in-app purchases) before launch, because it affects game design. Finally, prepare a store page with clear screenshots and a short gameplay video — it is your most important marketing asset.',
      },
    ],
  },
  {
    id: 3,
    slug: 'ai-in-web-development-prompt-engineering',
    title: 'The Future of AI in Web Development: Prompt Engineering Essentials',
    excerpt:
      'Explore how AI is revolutionizing web development and learn the essential skills for effective prompt engineering in 2024.',
    category: 'AI',
    date: '2024-01-05',
    readTime: '10 min read',
    image: '/images/ai-web-dev.jpg',
    tags: ['AI', 'Machine Learning', 'Prompt Engineering'],
    likes: 56,
    featured: true,
    content: [
      {
        type: 'p',
        text: 'Large language models have become a normal part of the web developer toolbox: they draft code, write tests, summarize documentation and power features inside our products. Getting reliable results from them, however, depends heavily on how we ask.',
      },
      { type: 'h', text: 'Be specific about the goal and the context' },
      {
        type: 'p',
        text: 'A model only knows what you tell it. Describe the role, the audience, the constraints and the expected output format. "Write a function" is vague; "Write a TypeScript function that validates an Indonesian phone number and returns a boolean, with unit tests in Vitest" is actionable.',
      },
      { type: 'h', text: 'Show examples' },
      {
        type: 'p',
        text: 'Few-shot prompting — giving one or two input/output examples — is one of the most effective ways to get consistent formatting, tone and structure.',
      },
      { type: 'h', text: 'Ask for structured output' },
      {
        type: 'code',
        lang: 'text',
        code: `Classify the customer message below.
Respond ONLY with JSON: {"category": "billing" | "bug" | "other", "urgent": boolean}

Message: """My payment went through twice, please help!"""`,
      },
      { type: 'h', text: 'Build guardrails into your app' },
      {
        type: 'ul',
        items: [
          'Validate model output (for example with a JSON schema) before using it.',
          'Never put API keys in front-end code — call the model from your backend.',
          'Log prompts and responses so you can debug and improve them.',
          'Keep a human in the loop for actions with real consequences.',
        ],
      },
      {
        type: 'p',
        text: 'Prompt engineering is less about magic phrases and more about clear communication. The developers who learn to specify problems precisely will get the most out of AI — and write better code in the process.',
      },
    ],
  },
  {
    id: 4,
    slug: 'nodejs-performance-optimization',
    title: 'Node.js Performance Optimization: Tips and Tricks',
    excerpt:
      'Discover advanced techniques to optimize your Node.js applications for better performance and scalability.',
    category: 'Web Dev',
    date: '2023-12-28',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Node.js', 'Performance', 'Backend'],
    likes: 34,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Node.js is fast by default, but a few common mistakes can make a server slow under load. These are the optimizations that give the biggest wins in real projects.',
      },
      { type: 'h', text: 'Never block the event loop' },
      {
        type: 'p',
        text: 'Node runs your JavaScript on a single thread. Synchronous file reads, heavy JSON parsing or CPU-intensive loops block every other request. Use async APIs, and move CPU-heavy work to worker threads or a job queue.',
      },
      { type: 'h', text: 'Run independent work in parallel' },
      {
        type: 'code',
        lang: 'js',
        code: `// Slow: runs one after another
const user = await getUser(id);
const orders = await getOrders(id);

// Fast: runs at the same time
const [user, orders] = await Promise.all([getUser(id), getOrders(id)]);`,
      },
      { type: 'h', text: 'Cache aggressively' },
      {
        type: 'ul',
        items: [
          'Cache expensive queries in memory or Redis with a sensible TTL.',
          'Use HTTP caching headers (ETag, Cache-Control) for public responses.',
          'Reuse database connections with a connection pool.',
        ],
      },
      { type: 'h', text: 'Use all CPU cores and stream large data' },
      {
        type: 'p',
        text: 'Run multiple processes with the cluster module or a process manager such as PM2. For large files or exports, use streams instead of loading everything into memory.',
      },
      {
        type: 'p',
        text: 'Finally, measure: tools like autocannon for load testing and clinic.js for profiling show exactly where time is spent, so you optimize the right thing.',
      },
    ],
  },
  {
    id: 5,
    slug: 'immersive-vr-experiences',
    title: "Creating Immersive VR Experiences: A Developer's Journey",
    excerpt:
      'My experience developing VR applications and the challenges faced while creating immersive virtual reality experiences.',
    category: 'Game Dev',
    date: '2023-12-20',
    readTime: '9 min read',
    image: '/images/vr-experience.jpg',
    tags: ['VR', 'Unity', 'Game Development'],
    likes: 23,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Building for virtual reality changed the way I think about interaction design. On a flat screen the player watches the world; in VR the player is inside it, and every small mistake is felt physically.',
      },
      { type: 'h', text: 'Comfort comes first' },
      {
        type: 'p',
        text: 'Motion sickness is the number-one reason people take off a headset. Keep a stable frame rate (72–90 FPS or more), avoid moving the camera without the player’s input, and offer teleport movement and snap turning as options.',
      },
      { type: 'h', text: 'Performance budget' },
      {
        type: 'ul',
        items: [
          'Bake lighting whenever possible instead of using real-time lights.',
          'Use LODs and occlusion culling to reduce draw calls.',
          'Profile on the actual device — the editor is not representative.',
        ],
      },
      { type: 'h', text: 'Design for hands, not buttons' },
      {
        type: 'p',
        text: 'Interactions feel best when they mimic reality: grab a lever, push a button, throw an object. The XR Interaction Toolkit in Unity provides solid building blocks for grabbing, sockets and UI rays.',
      },
      { type: 'h', text: 'What I learned' },
      {
        type: 'p',
        text: 'Playtest early and often with people new to VR. What feels natural to a developer who wears the headset every day can be confusing or uncomfortable for everyone else. Small details — sound positioning, haptic feedback, scale — matter more than in any other medium.',
      },
    ],
  },
  {
    id: 6,
    slug: 'integrating-chatgpt-api',
    title: 'Integrating ChatGPT API: Building Intelligent Web Applications',
    excerpt:
      "Step-by-step guide to integrating OpenAI's ChatGPT API into your web applications for enhanced user experiences.",
    category: 'AI',
    date: '2023-12-15',
    readTime: '7 min read',
    image: '/images/chatgpt-integration.jpg',
    tags: ['OpenAI', 'API Integration', 'ChatGPT'],
    likes: 67,
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Adding a conversational assistant to a web app is easier than ever, but doing it securely and cost-effectively requires a bit of architecture. Here is the setup I use.',
      },
      { type: 'h', text: '1. Keep the API key on the server' },
      {
        type: 'p',
        text: 'Never call the OpenAI API directly from the browser — anyone could read your key from the network tab. Create a small backend endpoint that receives the user message, calls the API, and returns the answer.',
      },
      {
        type: 'code',
        lang: 'js',
        code: `import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant for our store.' },
      ...req.body.messages,
    ],
  });
  res.json({ reply: completion.choices[0].message.content });
});`,
      },
      { type: 'h', text: '2. Give the model a clear system prompt' },
      {
        type: 'p',
        text: 'The system message defines personality, scope and rules. Tell the assistant what it should and should not answer, and which tone to use.',
      },
      { type: 'h', text: '3. Control cost and abuse' },
      {
        type: 'ul',
        items: [
          'Add rate limiting per IP or per user.',
          'Limit conversation history to the last few messages.',
          'Set max_tokens to cap the length of responses.',
          'Stream responses for a faster-feeling UI.',
        ],
      },
      {
        type: 'p',
        text: 'With these basics in place you can build support bots, writing assistants or smart search on top of your existing product in an afternoon.',
      },
    ],
  },
];
