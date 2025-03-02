import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  try {
    // Get the absolute path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'assets', 'data', 'body.json');
    
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON
    const data = JSON.parse(fileContents);
    
    // Return the data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading content file:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load content',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
