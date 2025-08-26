
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
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


export async function GET(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    try {
        await getAuth(adminApp).verifySessionCookie(session, true);
        return NextResponse.json({ isAuthenticated: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
}
