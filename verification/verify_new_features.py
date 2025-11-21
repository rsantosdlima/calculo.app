from playwright.sync_api import Page, expect, sync_playwright

def verify_new_features(page: Page):
    # 1. Verify Cookie Consent Banner
    page.goto("http://localhost:3000")
    # It should appear at the bottom
    expect(page.locator("text=Utilizamos cookies")).to_be_visible()
    expect(page.locator("button:has-text('Aceitar')")).to_be_visible()

    # 2. Verify Navigation to New Pages
    # Click "Sobre"
    page.get_by_role("link", name="Sobre").first.click()
    expect(page).to_have_title("Sobre Nós - Calculo.App.br")
    expect(page.locator("h1:has-text('Sobre Nós')")).to_be_visible()

    # Click "Contato"
    page.get_by_role("link", name="Contato").first.click()
    expect(page.locator("h1:has-text('Entre em Contato')")).to_be_visible()

    # Test Form
    page.fill("input#name", "Test User")
    page.fill("input#email", "test@example.com")
    page.fill("textarea#message", "Hello world")
    page.click("button[type=submit]")

    # Expect success message
    expect(page.locator("text=Mensagem enviada com sucesso")).to_be_visible()

    # 3. Verify Simple Interest Calculator
    # Navigate via Header Dropdown (might be tricky if hover needed) or Home Page
    page.goto("http://localhost:3000/calculadora-juros-simples")

    # Test Calculation
    # Principal: 1000, Rate: 1% a.m, Time: 12 months
    page.fill("input#principal", "1000")
    page.fill("input#rate", "1")
    # Rate unit default is monthly (1)
    page.fill("input#time", "12")
    # Time unit default is months (1)

    page.click("button:has-text('Calcular')")

    # Expected: Interest = 1000 * 0.01 * 12 = 120. Total = 1120.
    expect(page.locator("text=R$ 120.00")).to_be_visible()
    expect(page.locator("text=R$ 1120.00")).to_be_visible()

    # Test Unit Conversion
    # Rate: 12% a.a (Yearly), Time: 2 Years.
    # Rate 12% a.a -> 1% a.m. Time 2 years -> 24 months.
    # Interest = 1000 * (12/100) * 2 = 240.
    # Total = 1240.

    page.reload()
    page.fill("input#principal", "1000")
    page.fill("input#rate", "12")

    # Select Rate Unit: Yearly (value 12)
    # Selects are tricky if labels are same.
    # The Rate select is the first one, Time select is second.
    # Or use unique locators if possible.
    # We can select by value.

    # Select 'ao ano' for rate
    page.locator("select").first.select_option("12")

    page.fill("input#time", "2")
    # Select 'anos' for time
    page.locator("select").nth(1).select_option("12")

    page.click("button:has-text('Calcular')")

    expect(page.locator("text=R$ 240.00")).to_be_visible()
    expect(page.locator("text=R$ 1240.00")).to_be_visible()

    page.screenshot(path="/home/jules/verification/new_features.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_new_features(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
