export interface ApiService {
  getRequest<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T>;
}

export const apiService: ApiService = {
  async getRequest<T>(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<T> {
    const res = await fetch(input);
    return await res.json();
  },
};
