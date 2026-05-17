import { LoggerService } from "../services/logger.service.js";
import { WinstonProvider } from "../../infra/winston.js";

export function MakeLoggerComposition(){
    const PROVIDER = new WinstonProvider()
    return new LoggerService(PROVIDER);
}

const module = MakeLoggerComposition();

globalThis.logger = module;