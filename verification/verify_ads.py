from playwright.sync_api import Page, expect, sync_playwright

def verify_adsense_scripts(page: Page):
    page.goto("http://localhost:3000")

    # 1. Verify Main Script Injection
    # <script src="...adsbygoogle.js?client=ca-pub-1844345151440140" ...>
    # We look for the script in the page content or head

    # Note: Playwright page.content() returns the rendered HTML.
    content = page.content()
    client_id = "ca-pub-1844345151440140"

    if client_id in content and "adsbygoogle.js" in content:
        print("Main AdSense Script Found ✅")
    else:
        print("Main AdSense Script NOT Found ❌")
        # Be careful, next/script with strategy lazyOnload might load it later or async.
        # But usually it's injected into DOM.

    # 2. Verify Ad Slots presence
    # We have one in Sidebar (hidden on mobile but we are desktop default) and one in Home Banner

    # Banner
    banner_ad = page.locator(".adsense-container").first
    expect(banner_ad).to_be_visible()

    # Check for the <ins> tag with correct data-ad-client
    ins_tag = banner_ad.locator("ins.adsbygoogle")
    expect(ins_tag).to_have_attribute("data-ad-client", client_id)

    print("AdSense Slots Verified ✅")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_adsense_scripts(page)
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
