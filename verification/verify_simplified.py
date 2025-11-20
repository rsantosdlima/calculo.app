from playwright.sync_api import Page, expect, sync_playwright

def verify_simplified_discount(page: Page):
    page.goto("http://localhost:3000/calculadora-salario-liquido")

    # Test Case 1: Low Salary (Should use Simplified)
    # Gross: 3000
    # INSS: 258.82
    # Legal Deduction (Dependents 0): 0
    # Comparison: INSS (258.82) vs Simplified (607.20).
    # Winner: Simplified.
    # Base IRRF = 3000 - 607.20 = 2392.80.
    # IRRF Table (2259.20 to 2826.65 -> 7.5%, ded 169.44)
    # IRRF = (2392.80 * 0.075) - 169.44 = 179.46 - 169.44 = 10.02.
    # (Old logic was 36.15, so this is a benefit).

    page.fill("input#salary", "3000")
    page.fill("input#dependents", "0")
    page.click("button[type=submit]")

    # Expect "Desc. Simplificado" badge
    expect(page.locator("text=Desc. Simplificado")).to_be_visible()
    # Check IRRF value ~ 10.02
    expect(page.locator("text=R$ 10.02")).to_be_visible()

    # Test Case 2: High Salary (Should use Legal - maybe)
    # Gross: 10000
    # INSS: Ceiling (7786.02 * 14% - tiers...)
    # INSS Calculation:
    # Range 1 (1412): 105.9
    # Range 2 (1254.68): 112.92
    # Range 3 (1333.35): 160.00
    # Range 4 (3786.02): 530.04 (7786.02 - 4000.03 = 3785.99 * 0.14 = 530.038)
    # Total INSS: ~908.86.
    # Comparison: INSS (908.86) vs Simplified (607.20).
    # Winner: Legal (INSS).
    # Should NOT show "Desc. Simplificado" (or simpler check: ensure logic works).

    page.reload()
    page.fill("input#salary", "10000")
    page.click("button[type=submit]")

    # Should NOT verify simplified badge (expect not visible)
    expect(page.locator("text=Desc. Simplificado")).not_to_be_visible()

    page.screenshot(path="/home/jules/verification/simplified_discount.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_simplified_discount(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
