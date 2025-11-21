from playwright.sync_api import Page, expect, sync_playwright

def verify_navigation_and_ads(page: Page):
    page.goto("http://localhost:3000")

    # 1. Verify Header Dropdowns
    # Hover over "Trabalhistas"
    page.get_by_role("button", name="Trabalhistas").hover()
    # Check if "Salário Líquido" link appears
    expect(page.get_by_role("link", name="Salário Líquido").first).to_be_visible()

    # Hover over "Financeiros"
    page.get_by_role("button", name="Financeiros").hover()
    # Check if "Juros Simples" link appears
    expect(page.get_by_role("link", name="Juros Simples").first).to_be_visible()

    # Hover over "Datas"
    page.get_by_role("button", name="Datas").hover()
    # Check if placeholder appears
    expect(page.locator("text=Dias entre Datas (Em breve)")).to_be_visible()

    # 2. Verify AdSense Fix (Indirectly)
    # We check if the <ins> tag has class "adsbygoogle" and correct client ID from env
    # Since we fixed the ref, the logic to push({}) should run, but verifying execution is hard without ads loading.
    # We verify the DOM structure is correct.

    ad_ins = page.locator("ins.adsbygoogle").first
    expect(ad_ins).to_be_visible()
    # Check if data-ad-client matches what we set (from env.local or fallback)
    # Env local has: ca-pub-1844345151440140
    expect(ad_ins).to_have_attribute("data-ad-client", "ca-pub-1844345151440140")

    page.screenshot(path="/home/jules/verification/nav_update.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_navigation_and_ads(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
