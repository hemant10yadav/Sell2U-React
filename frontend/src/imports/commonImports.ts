import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import APIService from '../services/ApiService';
import { toast } from 'react-hot-toast';
import { z, ZodError } from 'zod';
import { AxiosError, AxiosResponse } from 'axios';
import { handleError } from '../services/ErrorHandler';
import i18n from '../assets/i18n/i18nConfig';
import { NavigateFunction } from 'react-router-dom';

const t = i18n.t;

export {
	React,
	useState,
	useEffect,
	classNames,
	APIService,
	z,
	ZodError,
	toast,
	handleError,
	t,
};
export type { NavigateFunction, ChangeEvent, AxiosError, AxiosResponse };
