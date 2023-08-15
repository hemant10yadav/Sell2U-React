import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import APIService from '../services/ApiService';
import { toast } from 'react-hot-toast';
import { z, ZodError } from 'zod';
import { AxiosError, AxiosResponse } from 'axios';
import { handleError } from '../services/ErrorHandler';
import i18n from '../assets/i18n/i18nConfig';
import { NavigateFunction } from 'react-router-dom';
import Paths from './Paths';

const translate = i18n.t;

export {
	React,
	useState,
	useEffect,
	useContext,
	classNames,
	APIService,
	z,
	ZodError,
	toast,
	handleError,
	translate,
	Paths,
};
export type { NavigateFunction, ChangeEvent, AxiosError, AxiosResponse };
