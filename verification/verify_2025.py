from playwright.sync_api import Page, expect, sync_playwright

def verify_tables(page: Page):
    page.goto("http://localhost:3000/calculadora-salario-liquido")

    # Test Case 1: INSS 2025 Range 1
    # Salary 1518.00 (Min Wage)
    # Expected INSS: 1518 * 7.5% = 113.85
    # Expected IRRF: 0 (Exempt up to 2428.80)
    # Expected Net: 1518 - 113.85 = 1404.15

    page.fill("input#salary", "1518")
    page.click("button[type=submit]")

    expect(page.locator("text=R$ 113.85")).to_be_visible()
    expect(page.locator("text=R$ 1404.15")).to_be_visible()

    # Test Case 2: INSS 2025 Ceiling
    # Salary 10000
    # Ceiling 8157.41.
    # Tier 1 (1518): 113.85
    # Tier 2 (2793.88-1518 = 1275.88): 114.8292
    # Tier 3 (4190.83-2793.88 = 1396.95): 167.634
    # Tier 4 (8157.41-4190.83 = 3966.58): 555.3212
    # Total INSS: 113.85 + 114.83 + 167.63 + 555.32 = 951.63 (approx)

    page.reload()
    page.fill("input#salary", "10000")
    page.click("button[type=submit]")

    # Check INSS is > 950 (exact math might vary by cents due to tier logic)
    # Let's trust the logic and just verify it's calculated and displayed.
    # Actually, let's verify the exact ceiling value if possible or just the net result exists.
    expect(page.locator("text=R$ 951.63")).to_be_visible()

    # Test Case 3: IRRF Exemption
    # Salary 2400 (Below 2428.80 exemption base)
    # INSS (2400): 113.85 + (882 * 0.09 = 79.38) = 193.23
    # Base IRRF: 2400 - 193.23 = 2206.77 (Exempt)
    # IRRF = 0

    page.reload()
    page.fill("input#salary", "2400")
    page.click("button[type=submit]")

    # IRRF should be 0.00
    # Result locator text-red-500 >> text=R$ 0.00
    # There are two red fields (INSS and IRRF), we need the second one or specifically IRRF row.
    # Let's grab the text next to IRRF label.
    # The label is "(-) IRRF"
    # The value is next to it.

    # We can check if "R$ 0.00" is visible generally (INSS is not 0).
    expect(page.locator("text=R$ 0.00")).to_be_visible()

    page.screenshot(path="/home/jules/verification/tables.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_tables(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
