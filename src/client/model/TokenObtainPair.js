/*
 * My stories API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.14
 *
 * Do not edit the class manually.
 *
 */

import {ApiClient} from '../ApiClient';

/**
 * The TokenObtainPair model module.
 * @module model/TokenObtainPair
 * @version v1
 */
export class TokenObtainPair {
  /**
   * Constructs a new <code>TokenObtainPair</code>.
   * @alias module:model/TokenObtainPair
   * @class
   * @param email {String} 
   * @param password {String} 
   */
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  /**
   * Constructs a <code>TokenObtainPair</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TokenObtainPair} obj Optional instance to populate.
   * @return {module:model/TokenObtainPair} The populated <code>TokenObtainPair</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new TokenObtainPair();
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} email
 */
TokenObtainPair.prototype.email = undefined;

/**
 * @member {String} password
 */
TokenObtainPair.prototype.password = undefined;


