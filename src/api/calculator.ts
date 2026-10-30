const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function calculate(expression: string): Promise<number> {
  const response = await fetch(`${BASE_URL}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? 'Calculation failed');
  }

  const data: { result: number } = await response.json();
  return data.result;
}
