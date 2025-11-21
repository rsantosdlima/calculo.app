from playwright.sync_api import Page, expect, sync_playwright

def verify_latest_features(page: Page):
    page.goto("http://localhost:3000")

    # 1. Verify "Dias entre Datas"
    page.get_by_role("button", name="Datas").hover()
    page.get_by_role("link", name="Dias entre Datas").click()

    expect(page.locator("h1:has-text('Calculadora de Dias entre Datas')")).to_be_visible()

    # Calculate 2024-01-01 to 2025-01-01
    page.fill("input#startDate", "2024-01-01")
    page.fill("input#endDate", "2025-01-01")
    page.click("button[type=submit]")

    # 2024 is a leap year (366 days)
    expect(page.locator("text=366 dias")).to_be_visible()

    # 2. Verify "IRRF 2026"
    page.get_by_role("button", name="Trabalhistas").hover()
    page.get_by_role("link", name="Simulação IRRF 2026").click()

    # Check for warning banner
    expect(page.locator("text=Atenção: A tabela oficial de 2026 ainda não foi divulgada")).to_be_visible()
    expect(page.locator("h1:has-text('Calculadora de Salário Líquido')")).to_be_visible()

    page.screenshot(path="/home/jules/verification/latest_features.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_latest_features(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
