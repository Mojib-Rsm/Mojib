
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Mojib Rsm',
  description: 'Disclaimer for the personal portfolio website of Mojib Rsm.',
};

export default function DisclaimerPage() {
  return (
    <div className="container max-w-screen-md mx-auto py-12 md:py-20">
      <article className="prose dark:prose-invert max-w-none text-lg mx-auto">
        <h1>Disclaimer</h1>
        <p>Last updated: July 29, 2024</p>

        <h2>General Information</h2>
        <p>The information contained on this website (https://www.mojib.me) is for general information purposes only. Mojib Rsm assumes no responsibility for errors or omissions in the contents of the Service.</p>

        <h2>No Professional Advice</h2>
        <p>The information provided on this website, including but not limited to blog posts, articles, and tutorials, is not intended as professional advice. It is for informational purposes only. While I strive to provide accurate and up-to-date information, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
        
        <h2>External Links Disclaimer</h2>
        <p>This website may contain links to external websites that are not provided or maintained by or in any way affiliated with Mojib Rsm. Please note that Mojib Rsm does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>

        <h2>Affiliate Disclaimer</h2>
        <p>This disclaimer discloses that I may have affiliate relationships with some of the companies whose products or services are mentioned on this website. This means that, at no additional cost to you, I may earn a commission if you click through and make a purchase. I only recommend products and services that I believe will add value to my readers.</p>
        
        <h2>Views Expressed Disclaimer</h2>
        <p>The views and opinions expressed on this website, particularly in the blog section, are those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer or company. Assumptions made in the analysis are not reflective of the position of any entity other than the author(s).</p>
        
        <h2>No Warranties</h2>
        <p>This website is provided "as is" with no representations or warranties, express or implied. Mojib Rsm makes no representations or warranties in relation to this website or the information and materials provided on this website.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions about this Disclaimer, You can contact us:</p>
        <ul>
          <li>By visiting the contact page on our website: <a href="/#contact">Contact Page</a></li>
          <li>By email: mojibrsm@gmail.com</li>
        </ul>
      </article>
    </div>
  );
}
