import { HashingService } from "../services/hashing.service.js"
import crypto from 'crypto';
function MakeHashingModule(){

const BCRYPT = {}

return new HashingService(BCRYPT)
}