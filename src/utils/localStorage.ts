/**
 * Shared localStorage utility with error handling
 * Provides type-safe methods for storing and retrieving data from localStorage
 */

/**
 * Gets an item from localStorage and parses it as JSON
 * @param key - The localStorage key
 * @param defaultValue - The default value to return if the key doesn't exist or parsing fails
 * @returns The parsed value or the default value
 */
export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to get item "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Sets an item in localStorage after stringifying it as JSON
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns true if successful, false otherwise
 */
export const setItem = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to set item "${key}" in localStorage:`, error);
    return false;
  }
};

/**
 * Removes an item from localStorage
 * @param key - The localStorage key
 * @returns true if successful, false otherwise
 */
export const removeItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove item "${key}" from localStorage:`, error);
    return false;
  }
};

/**
 * Creates a debounced setter function to avoid frequent localStorage writes
 * @param key - The localStorage key
 * @param delay - The debounce delay in milliseconds (default: 500ms)
 * @returns A function that takes a value and schedules it to be saved
 */
export const createDebouncedSetter = <T>(
  key: string,
  delay: number = 500
): ((value: T) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (value: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setItem(key, value);
      timeoutId = null;
    }, delay);
  };
};
