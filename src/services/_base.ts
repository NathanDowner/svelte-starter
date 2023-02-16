
// import { authModule } from '/modules/core/auth';
// import { AuthStore } from '@/store/auth';
import env, { loadEnvAsync } from '@/config/env';
import storage from '@/utils/storage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

class BaseService {
  protected api: AxiosInstance;

  // --------------------------------------------------------------------------
  // Constructor
  // --------------------------------------------------------------------------
  constructor(config: AxiosRequestConfig | undefined = undefined) {
    const overrides = config ? config : {};
    const options: AxiosRequestConfig = {
      timeout: env.settings.API_TIMEOUT_MS,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.api = axios.create({ ...options, ...overrides });

    this.init(config);
  }

  // --------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------
  private init(config: AxiosRequestConfig | undefined) {
    // Setting up interceptor
    this.api.interceptors.request.use(
      async (config) => {
        const env = await loadEnvAsync();

        config.baseURL = env.API_URL;

        return this.onRequest(config);
      },
      async (error: unknown) => this.onRequestError(error)
    );

    this.api.interceptors.response.use(
      (response) => this.onResponse(response),
      (error: AxiosError) => this.onResponseError(error)
    );
  }

  // --------------------------------------------------------------------------
  // Event Handlers
  // --------------------------------------------------------------------------
  protected async onRequest(config: AxiosRequestConfig) {
    const token = storage.getToken();

    if (token) {
      config.headers!['Authorization'] = 'Bearer ' + token;
    }

    return config;
  }

  protected async onRequestError(error: unknown) {
    // TODO: override
    return Promise.reject(error);
  }

  protected onResponse(response: AxiosResponse) {
    // TODO: override
    return response;
  }

  protected async onResponseError(error: AxiosError): Promise<any> {
    // Check for 401 events that has to do specifically with expired tokens
    // tslint:disable-next-line: no-magic-numbers
    // if (error.response?.status === 401) {
    //   const token = storage.getToken();

    //   if (token?.refreshToken) {
    //     await AuthStore.regenerateAccessToken(
    //       token?.refreshToken!,
    //       token?.accessToken!
    //     );

    //     try {
    //       const config = error.config;

    //       config.headers.Authorization = `Bearer ${authModule.token?.accessToken}`;

    //       return new Promise((resolve, reject) => {
    //         axios
    //           .request(config)
    //           .then((response) => {
    //             resolve(response);
    //           })
    //           .catch((tokenError) => {
    //             reject(tokenError);
    //           });
    //       });
    //     } catch (tokenError) {
    //       return Promise.reject(tokenError);
    //     }
    //   } else {
    //     // remove token to force a logout
    //     authModule.removeToken();
    //     return Promise.reject(error);
    //   }
    // }
    return Promise.reject(error);
  }
}

export { BaseService };
