
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Mojib Rsm',
  description: 'Terms and Conditions for the personal portfolio website of Mojib Rsm.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container max-w-screen-md mx-auto py-12 md:py-20">
      <article className="prose dark:prose-invert max-w-none text-lg mx-auto">
        <h1>Terms and Conditions</h1>
        <p>Last updated: July 29, 2024</p>
        
        <p>Please read these terms and conditions carefully before using Our Service.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this website (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Service's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.</p>
        
        <h2>2. Use of the Website</h2>
        <p>You agree to use the website for lawful purposes only. You are prohibited from posting on or transmitting through the website any material that is harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</p>
        
        <h2>3. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Mojib Rsm and its licensors. The Service is protected by copyright, trademark, and other laws of both Bangladesh and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Mojib Rsm.</p>

        <h2>4. Links to Other Websites</h2>
        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Mojib Rsm. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Mojib Rsm shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
        
        <h2>5. Limitation of Liability</h2>
        <p>In no event shall Mojib Rsm, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

        <h2>6. Disclaimer</h2>
        <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>

        <h2>7. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.</p>
        
        <h2>8. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li>By visiting the contact page on our website: <a href="/#contact">Contact Page</a></li>
          <li>By email: mojibrsm@gmail.com</li>
        </ul>
      </article>
    </div>
  );
}
