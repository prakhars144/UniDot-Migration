export enum Category {
  LIFECYCLE = "Lifecycle",
  CORE = "Core C# vs GDScript",
  LOGIC = "Logic & Control Flow",
  MATH = "Math & constants",
  VECTOR = "Vector Math",
  STRING = "Strings",
  ARRAY = "Arrays & Dictionaries",
  TRANSFORMS = "Transforms (3D)",
  TRANSFORMS_2D = "Transforms (2D)",
  PHYSICS_3D = "Physics (3D)",
  PHYSICS_2D = "Physics (2D)",
  INPUT = "Input",
  OBJECTS = "Object Management",
  SCENE = "Scene Management",
  UI = "UI (Scripting)",
  AUDIO = "Audio",
  FILES = "Files & IO",
  TIME = "Time & Coroutines",
  DATETIME = "Date & System Time",
  DEVICE = "Device & Screen",
  GRAPHICS = "Graphics & Lighting",
  PARTICLES = "Particles",
  NAVIGATION = "Navigation",
  NETWORKING = "Networking",
  EDITOR = "Editor Scripting"
}

export interface MigrationItem {
  id: string;
  category: Category;
  title: string;
  unityCode: string;
  godotCode: string;
  description?: string;
  pitfall?: string; // Critical warnings/gotchas
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}