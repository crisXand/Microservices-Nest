
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errorResponse = exception.getError();
    console.error('RPC Exception caught:', errorResponse);

    if(typeof errorResponse === 'object' && errorResponse !== null && 'status' in errorResponse && 'message' in errorResponse) {
      const status = errorResponse.status;
      return response.status(status).json({
        statusCode: status,
        message: errorResponse.message || 'An error occurred',
      });
    }

    const status = 500; // Default to Internal Server Error

    return response.status(status).json({
      statusCode: status,
      message: errorResponse,
    });
  }
}
