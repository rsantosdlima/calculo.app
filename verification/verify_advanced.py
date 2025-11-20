from playwright.sync_api import Page, expect, sync_playwright

def verify_advanced_calculator(page: Page):
    # 1. Navigate to Calculator
    page.goto("http://localhost:3000/calculadora-salario-liquido")

    # 2. Test Case 1: Basic Salary + Other Discounts
    page.fill("input#salary", "3000")
    page.fill("input#otherDiscounts", "100")
    page.click("button[type=submit]")

    # Check Net Result: "R$ 2605.03"
    expect(page.locator(".text-green-700 >> text=2605.03")).to_be_visible()

    # 3. Test Case 2: Alimony (Fixed Value)
    page.reload()
    page.fill("input#salary", "5000")

    # Enable Alimony
    page.check("input#hasAlimony")

    # Select Fixed Value (Type 3)
    page.select_option("select#alimonyType", "3")

    page.fill("input#alimonyValue", "1000")
    page.click("button[type=submit]")

    # Check Result Detail Section for Alimony
    # Use class selector to differentiate from input label
    expect(page.locator(".text-orange-600 >> text=Pensão Alimentícia")).to_be_visible()

    # Check values
    expect(page.locator("text=R$ 1000.00")).to_be_visible()
    expect(page.locator(".text-green-700 >> text=3340.44")).to_be_visible()

    # 4. Mobile Viewport Check
    page.set_viewport_size({"width": 375, "height": 667})
    page.screenshot(path="/home/jules/verification/advanced_calc_mobile.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_advanced_calculator(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
