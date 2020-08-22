import React, { CSSProperties, FC, ReactElement, InputHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm' | 'default'

//使用Omit来忽略原来定义中的某些属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    style?: CSSProperties
}

export const Input: FC<InputProps> = (props) => {
    // 取出各种的属性
    const { disabled, size, icon, prepend, append, children, style, ...restProps } = props
    // 根据属性计算不同的className
    const classes = classNames('ck-input', classNames, {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })

    return (
        // 根据属性判断是否要添加特定的节点
        <div className={ classes } style={ style }>
            { prepend && <div className='ck-input-group-prpend'>{ prepend }</div> }
            { icon && <div className='icon-wrapper'><Icon icon={ icon } title={ `title-${icon}` } /></div> }
            <input 
                type="text"
                className='ck-input-inner'
                disabled={ disabled }
                { ...restProps }
            />
        </div>
    )
}

export default Input;