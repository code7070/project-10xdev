import { PostgrestError } from "@supabase/supabase-js";
import { error } from "elysia";
import { ServiceResponse } from "../interfaces/entities";

export class HelperService {
  private isPostgrestError(obj: any): obj is PostgrestError {
    if (typeof obj === "object") return "code" in obj;
    return false;
  }

  private errorResponse(err: PostgrestError, statusCode?: number) {
    return error(statusCode || 400, { message: err.message });
  }

  private successResponse<T>(data: T): ServiceResponse<T> {
    return {
      status: 200,
      data,
    };
  }

  handleResponse<T>(response: T) {
    if (this.isPostgrestError(response)) return this.errorResponse(response);
    return this.successResponse(response);
  }
}
