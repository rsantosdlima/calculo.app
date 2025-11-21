from playwright.sync_api import Page, expect, sync_playwright

def verify_rebranding(page: Page):
    page.goto("http://localhost:3000")

    # 1. Verify Header Title
    expect(page.locator("a.text-2xl.font-bold")).to_have_text("Calculo.App")

    # 2. Verify Footer
    expect(page.locator("footer")).to_contain_text("Calculo.App offers") # Wait, my text is in Portuguese?
    # Let's check the Portuguese text I wrote: "Calculo.App oferece..."
    expect(page.locator("footer")).to_contain_text("Calculo.App oferece")
    expect(page.locator("footer")).to_contain_text("© 2025 Calculo.App. Todos os direitos reservados.")

    # 3. Verify Page Titles (Metadata) via Head (not easily visible in body)
    # But we can verify visible H1s on legal pages
    page.get_by_role("link", name="Sobre").first.click()
    expect(page.locator("body")).to_contain_text("O Calculo.App nasceu")

    print("Branding Verified ✅")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_rebranding(page)
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
