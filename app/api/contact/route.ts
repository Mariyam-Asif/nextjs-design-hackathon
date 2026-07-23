import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // 1. Server-side Validation
    const errors: Record<string, string> = {};

    if (!name || name.trim().length < 2 || name.trim().length > 100) {
      errors.name = 'Name must be between 2 and 100 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!subject || subject.trim().length < 5 || subject.trim().length > 200) {
      errors.subject = 'Subject must be between 5 and 200 characters.';
    }

    if (!message || message.trim().length < 10 || message.trim().length > 2000) {
      errors.message = 'Message must be between 10 and 2000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // 2. Write submission document to Sanity
    const doc = {
      _type: 'contactSubmission',
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    try {
      await writeClient.create(doc);
    } catch (writeErr: unknown) {
      const errMessage = writeErr instanceof Error ? writeErr.message : String(writeErr);
      console.error('Sanity write error in contact API:', errMessage);

      // If token missing or unauthorized, log actionable info
      if (errMessage.includes('token') || errMessage.includes('Unauthorized') || errMessage.includes('permission')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Server configuration error: SANITY_API_TOKEN is missing or lacks write permissions in environment variables. Please check your Vercel deployment environment variables.',
          },
          { status: 500 }
        );
      }
      throw writeErr;
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in contact API route:', errMessage);
    return NextResponse.json(
      { success: false, message: 'Failed to save message. Please ensure SANITY_API_TOKEN is set in Vercel environment settings.' },
      { status: 500 }
    );
  }
}
