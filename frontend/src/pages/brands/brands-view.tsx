import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/brands/brandsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const BrandsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { brands } = useAppSelector((state) => state.brands)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View brands')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View brands')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/brands/brands-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>BrandName</p>
                    <p>{brands?.name}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Models Brand</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>ModelName</th>

                            </tr>
                            </thead>
                            <tbody>
                            {brands.models_brand && Array.isArray(brands.models_brand) &&
                              brands.models_brand.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/models/models-view/?id=${item.id}`)}>

                                    <td data-label="name">
                                        { item.name }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!brands?.models_brand?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/brands/brands-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

BrandsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default BrandsView;
