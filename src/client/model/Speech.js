/*
 * My stories API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.16
 *
 * Do not edit the class manually.
 *
 */

import {ApiClient} from '../ApiClient';
import {Story} from './Story';

/**
 * The Speech model module.
 * @module model/Speech
 * @version v1
 */
export class Speech {
  /**
   * Constructs a new <code>Speech</code>.
   * @alias module:model/Speech
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Speech</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Speech} obj Optional instance to populate.
   * @return {module:model/Speech} The populated <code>Speech</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Speech();
      if (data.hasOwnProperty('pk'))
        obj.pk = ApiClient.convertToType(data['pk'], 'Number');
      if (data.hasOwnProperty('story'))
        obj.story = Story.constructFromObject(data['story']);
      if (data.hasOwnProperty('language'))
        obj.language = ApiClient.convertToType(data['language'], 'String');
      if (data.hasOwnProperty('speech_file'))
        obj.speechFile = ApiClient.convertToType(data['speech_file'], 'String');
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], 'String');
      if (data.hasOwnProperty('updatedAt'))
        obj.updatedAt = ApiClient.convertToType(data['updatedAt'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} pk
 */
Speech.prototype.pk = undefined;

/**
 * @member {module:model/Story} story
 */
Speech.prototype.story = undefined;

/**
 * @member {String} language
 */
Speech.prototype.language = undefined;

/**
 * @member {String} speechFile
 */
Speech.prototype.speechFile = undefined;

/**
 * @member {String} createdAt
 */
Speech.prototype.createdAt = undefined;

/**
 * @member {String} updatedAt
 */
Speech.prototype.updatedAt = undefined;


