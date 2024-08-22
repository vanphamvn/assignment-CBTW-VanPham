import { expect } from '@playwright/test';

class ApiHelper {
    authToken: string;

    setAuthToken(authToken: string) {
        this.authToken = authToken;
    }

    // Verify status code
    verifyStatusCode(response, expectedStatusCode) {
        expect(response.status()).toBe(expectedStatusCode);
        if (process.env.DEBUG === 'true') {
            expect(response).toBeOK();
        }
    }

    // Verify response body contains specific properties
    verifyResponseBodyContains(responseData, expectedProperties) {
        for (const key of expectedProperties) {
            expect(responseData).toHaveProperty(key);
        }
    }

    //Verify response body matches expected values
    verifyResponseBodyMatches(responseData, expectedValues) {
        for (const [key, value] of Object.entries(expectedValues)) {
            expect(responseData[key]).toEqual(value);
        }
    }

    verifyResponseBodyMatchesIgnoreKey(responseData, expectedValues, ignoredKeys) {
        for (const [key, value] of Object.entries(expectedValues)) {
            if (!ignoredKeys.includes(key)) {
                expect(responseData[key]).toEqual(value);
            }           
        }
    }

    // Recursively compare two JSON objects to ensure they have the same structure and types
    compareJsonStructure(actual, expected) {
        if (typeof actual !== typeof expected) {
            throw new Error(`Type mismatch: expected ${typeof expected}, got ${typeof actual}`);
        }

        if (typeof expected === 'object' && expected !== null) {
            if (Array.isArray(expected)) {
                if (!Array.isArray(actual)) {
                    throw new Error('Type mismatch: expected array, got non-array');
                }

                // If arrays, check that all items have the same structure as the first item
                for (let i = 0; i < expected.length; i++) {
                    this.compareJsonStructure(actual[i], expected[0]);
                }
            } else {
                // Compare each property in the object
                for (const key in expected) {
                    if (expected.hasOwnProperty(key)) {
                        if (!actual.hasOwnProperty(key)) {
                            throw new Error(`Missing property: ${key}`);
                        }
                        this.compareJsonStructure(actual[key], expected[key]);
                    }
                }
            }
        }
    }

    // Verify that the response JSON matches the expected structure
    verifyJsonStructure(responseData, expectedStructure) {
        try {
            this.compareJsonStructure(responseData, expectedStructure);
        } catch (error) {
            console.error(`JSON structure mismatch: ${error.message}`);
            throw error;
        }
    }

    async verifyApiResponse(response, expectedResponse) {
        const responseData = await response.json();
        this.verifyJsonStructure(responseData, expectedResponse);
        this.verifyResponseBodyMatches(responseData, expectedResponse);
    }

    async verifyApiResponseIgnoreKey(response, expectedResponse, ignoreProperties) {
        const responseData = await response.json();
        console.log(responseData);
        this.verifyJsonStructure(responseData, expectedResponse);
        this.verifyResponseBodyMatchesIgnoreKey(responseData, expectedResponse, ignoreProperties);
    }
}

export default ApiHelper;
