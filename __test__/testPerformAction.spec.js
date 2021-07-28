/**
 * @jest-environment jsdom
 */
import { performAction } from "../src/client/js/app"

require("babel-polyfill");

test('Perform Action', () => {
    expect(performAction).toBeDefined();
});

