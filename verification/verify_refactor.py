from playwright.sync_api import Page, expect, sync_playwright

def verify_homepage_and_calculator(page: Page):
    # 1. Navigate to Home
    page.goto("http://localhost:3000")
    expect(page).to_have_title("Calculo.App.br - Simulações e Cálculos Online")

    # Check "Coming Soon" placeholders
    # Use specific locator to avoid strict mode violation (there is also a link in sidebar)
    # We want the one in the main grid
    expect(page.locator("h3", has_text="Correção Monetária").first).to_be_visible()
    expect(page.get_by_text("Em breve: Atualize valores pela inflação")).to_be_visible()

    # 2. Navigate to Calculator
    # Use the main card link
    page.locator(".group", has_text="Salário Líquido").click()

    # 3. Perform Calculation
    expect(page.get_by_role("heading", name="Calculadora de Salário Líquido (2024)")).to_be_visible()
    page.fill("input#salary", "4000")
    page.fill("input#dependents", "0")
    page.get_by_role("button", name="Calcular").click()

    # 4. Verify Result (Visual Check)
    # Be very specific to avoid ambiguity
    # The result label is <span ...>Salário Líquido</span> inside the result box.
    # We can check for the value next to it or just the container.

    # Check for the green text which is the final result label
    expect(page.locator(".text-green-600 >> text=Salário Líquido")).to_be_visible()

    # 5. Screenshot
    page.screenshot(path="/home/jules/verification/refactor_verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_homepage_and_calculator(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
