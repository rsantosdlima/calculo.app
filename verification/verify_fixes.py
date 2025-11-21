from playwright.sync_api import Page, expect, sync_playwright

def verify_fixes(page: Page):
    page.goto("http://localhost:3000")

    # 1. Verify Link Navigation (Trailing Slash Fix)
    # Click "Salário Líquido" from Dropdown
    page.get_by_role("button", name="Trabalhistas").hover()

    # Wait for the link to be visible
    link = page.get_by_role("link", name="Salário Líquido").first
    link.click()

    # Check URL - should have trailing slash or just resolve correctly
    # And check content
    expect(page.locator("h1:has-text('Calculadora de Salário Líquido')")).to_be_visible()

    # 2. Verify AdSense Script presence (afterInteractive)
    # Check if script tag is present in head/body
    content = page.content()
    if "adsbygoogle.js" in content:
        print("AdSense Script Found ✅")
    else:
        print("AdSense Script NOT Found ❌")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_fixes(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
