
import { NextRequest, NextResponse } from 'next/server';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { getApp, getApps, initializeApp, App } from 'firebase-admin/app';
import { serviceAccount } from '@/lib/firebase-admin';

let adminApp: App;

try {
    adminApp = getApp();
} catch (e) {
    adminApp = initializeApp({
        credential: {
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        }
    });
}


export async function POST(request: NextRequest) {
    const authorization = request.headers.get('Authorization');
    if (authorization?.startsWith('Bearer ')) {
        const idToken = authorization.split('Bearer ')[1];
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        try {
            const sessionCookie = await getAuth(adminApp).createSessionCookie(idToken, { expiresIn });
            const options = {
                name: 'session',
                value: sessionCookie,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            };

            const response = NextResponse.json({ status: 'success' });
            response.cookies.set(options);
            return response;
        } catch (error) {
            console.error('Session cookie creation failed:', error);
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
    }
    return NextResponse.json({ status: 'error', message: 'Bad Request' }, { status: 400 });
}


export async function DELETE(request: NextRequest) {
    const options = {
        name: 'session',
        value: '',
        maxAge: -1,
    };
    const response = NextResponse.json({ status: 'success' });
    response.cookies.set(options);
    return response;
}
