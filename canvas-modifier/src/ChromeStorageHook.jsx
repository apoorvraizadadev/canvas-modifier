import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage state synchronized with chrome.storage.sync
 * * @param {string} key - The key under which the value is stored in chrome.storage
 * @param {any} initialValue - The fallback value if nothing is found in storage
 * @returns {[any, Function]} - Returns the state value and a setter function
 */
export function useChromeStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  // 1. Fetch the initial value from Chrome storage when the component mounts
  useEffect(() => {
    // Safety check: Ensures the code doesn't crash if run outside a Chrome extension environment (e.g., localhost testing)
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get([key], (result) => {
        if (result[key] !== undefined) {
          setStoredValue(result[key]);
        }
      });
    }
  }, [key]);

  // 2. Listen for storage changes made by other parts of the extension
  useEffect(() => {
    const handleStorageChange = (changes, areaName) => {
      if (areaName === 'local' && changes[key]) {
        setStoredValue(changes[key].newValue);
      }
    };

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(handleStorageChange);
      
      // Cleanup listener on unmount
      return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      };
    }
  }, [key]);

  // 3. Update React state AND save to Chrome storage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function, just like native useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update local React state
      setStoredValue(valueToStore);

      // Persist to Chrome storage
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ [key]: valueToStore });
      } else {
        // Fallback for local development outside the extension
        console.warn('Chrome storage API not available. Value only updated in local React state.');
      }
    } catch (error) {
      console.error(`Error setting chrome storage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}